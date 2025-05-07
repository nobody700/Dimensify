import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;
const MODEL_ID = 'konieshadow/fooocus-api:fda927242b1db6affa1ece4f54c37f19b964666bf23b0d06ae2439067cd344a4';

interface TextToImageParams {
  prompt: string;
  image_seed?: number;
  cn_type1?: string;
  cn_type2?: string;
  cn_type3?: string;
  cn_type4?: string;
  sharpness?: number;
  uov_method?: string;
  image_number?: number;
  guidance_scale?: number;
  refiner_switch?: number;
  negative_prompt?: string;
  style_selections?: string;
  uov_upscale_value?: number;
  outpaint_selections?: string;
  outpaint_distance_top?: number;
  performance_selection?: string;
  outpaint_distance_left?: number;
  aspect_ratios_selection?: string;
  outpaint_distance_right?: number;
  outpaint_distance_bottom?: number;
  inpaint_additional_prompt?: string;
}

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('Invalid API token. Please check your credentials.');
        case 403:
          throw new Error('Access forbidden. Please check your API permissions.');
        case 429:
          throw new Error('Rate limit exceeded. Please try again later.');
        default:
          throw new Error(`API Error: ${error.response.data.error || 'Unknown error occurred'}`);
      }
    } else if (error.request) {
      throw new Error('Unable to reach the API. Please check your internet connection.');
    }
  }
  throw new Error('An unexpected error occurred. Please try again.');
};

const createPrediction = async (inputs: Record<string, any>) => {
  if (!API_TOKEN) {
    throw new Error('API token not configured. Please check your environment variables.');
  }

  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: MODEL_ID,
        input: {
          ...inputs,
          style_selections: 'Fooocus V2,Fooocus Enhance,Fooocus Sharp',
          image_number: 1,
          refiner_switch: 0.5,
          uov_method: 'Disabled',
        },
      },
      {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getPrediction = async (id: string) => {
  if (!API_TOKEN) {
    throw new Error('API token not configured. Please check your environment variables.');
  }

  try {
    const response = await axios.get(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const generateTextToImage = async (params: TextToImageParams) => {
  try {
    const prediction = await createPrediction({
      ...params,
      image_seed: params.image_seed ?? Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    });
    
    let result = await getPrediction(prediction.id);
    let attempts = 0;
    const maxAttempts = 60; // 1 minute timeout
    
    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await getPrediction(prediction.id);
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      throw new Error('Generation timed out. Please try again.');
    }
    
    if (result.status === 'failed') {
      throw new Error(result.error || 'Generation failed. Please try again.');
    }
    
    return result.output;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};