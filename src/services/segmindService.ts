import axios from 'axios';

const API_KEY = import.meta.env.VITE_SEGMIND_API_KEY;

interface TextToVideoParams {
  prompt: string;
  seed?: number;
  duration?: string;
  aspect_ratio?: string;
}

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('Invalid API key. Please check your credentials.');
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

// Hide implementation details
const generateVideo = async (params: TextToVideoParams) => {
  if (!API_KEY) {
    throw new Error('API key not configured. Please check your environment variables.');
  }

  try {
    const response = await axios.post(
      'https://api.segmind.com/v1/veo-2',
      {
        ...params,
        seed: params.seed || Math.floor(Math.random() * 1000000),
        duration: params.duration || '5',
        aspect_ratio: params.aspect_ratio || '16:9',
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert array buffer to base64
    const videoBase64 = Buffer.from(response.data).toString('base64');
    return `data:video/mp4;base64,${videoBase64}`;
  } catch (error) {
    handleApiError(error);
  }
};

export const textToVideo = async (params: TextToVideoParams) => {
  try {
    return await generateVideo(params);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};
