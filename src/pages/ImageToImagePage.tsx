import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Image, AlertCircle, Download, Loader2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { generateImageToImage } from '../services/replicateService';

interface FormData {
  prompt: string;
  negative_prompt: string;
  strength: number;
  style_name: string;
  guidance_scale: number;
  seed: number;
}

const ImageToImagePage: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const { control, handleSubmit, register, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      prompt: '',
      negative_prompt: 'bad quality, low resolution, blurry',
      strength: 0.7,
      style_name: 'base',
      guidance_scale: 7,
      seed: -1,
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSourceImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1
  });

  const styleOptions = [
    { value: 'base', label: 'Base' },
    { value: 'anime', label: 'Anime' },
    { value: 'photographic', label: 'Photographic' },
    { value: 'digital-art', label: 'Digital Art' },
    { value: 'comic-book', label: 'Comic Book' },
    { value: 'fantasy-art', label: 'Fantasy Art' },
    { value: 'line-art', label: 'Line Art' },
    { value: 'analog-film', label: 'Analog Film' },
    { value: 'neon-punk', label: 'Neon Punk' },
    { value: 'isometric', label: 'Isometric' },
    { value: 'low-poly', label: 'Low Poly' },
    { value: 'origami', label: 'Origami' },
    { value: 'pixel-art', label: 'Pixel Art' },
  ];

  const onSubmit = async (data: FormData) => {
    if (!sourceImage) {
      toast.error('Please upload a source image');
      return;
    }
    
    setIsGenerating(true);
    try {
      const toastId = toast.loading('Transforming your image...');
      
      const result = await generateImageToImage({
        image: sourceImage,
        prompt: data.prompt,
        negative_prompt: data.negative_prompt,
        strength: data.strength,
        style_name: data.style_name,
        guidance_scale: data.guidance_scale,
        seed: data.seed,
      });
      
      toast.success('Image transformed successfully!', { id: toastId });
      setGeneratedImages(Array.isArray(result) ? result : [result]);
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to transform image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `dimensify-transform-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
            Image to Image
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Transform existing images with AI. Upload your image, add a prompt to guide the transformation,
          and watch as your image is reimagined.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Source Image
              </label>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed ${isDragActive ? 'border-primary-400 bg-primary-900/10' : 'border-dark-700'} rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary-400`}
              >
                <input {...getInputProps()} />
                {sourceImage ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={sourceImage} 
                      alt="Source" 
                      className="max-h-40 mb-4 rounded"
                    />
                    <p className="text-sm text-gray-400">
                      Click or drag to change image
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="h-12 w-12 text-gray-500" />
                    <p className="text-base text-gray-300">
                      {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports JPG, PNG, and WEBP
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">
                Transformation Prompt
              </label>
              <textarea
                id="prompt"
                rows={3}
                placeholder="Describe how you want to transform the image..."
                className={`w-full px-4 py-2 bg-dark-800 border ${errors.prompt ? 'border-red-500' : 'border-dark-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none`}
                {...register('prompt', { required: 'Prompt is required' })}
              />
              {errors.prompt && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.prompt.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="negative_prompt" className="block text-sm font-medium text-gray-300 mb-1">
                Negative Prompt
              </label>
              <textarea
                id="negative_prompt"
                rows={2}
                placeholder="Elements you want to exclude..."
                className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                {...register('negative_prompt')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="style_name" className="block text-sm font-medium text-gray-300 mb-1">
                  Style
                </label>
                <select
                  id="style_name"
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  {...register('style_name')}
                >
                  {styleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="strength" className="block text-sm font-medium text-gray-300 mb-1">
                    Transformation Strength
                  </label>
                  <Controller
                    name="strength"
                    control={control}
                    render={({ field }) => (
                      <span className="text-sm text-gray-400">{field.value}</span>
                    )}
                  />
                </div>
                <Controller
                  name="strength"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      onChange={field.onChange}
                      value={field.value}
                      className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  )}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Subtle</span>
                  <span>Strong</span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="text-sm text-primary-400 hover:text-primary-300 flex items-center"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
              </button>
              
              {showAdvanced && (
                <div className="mt-4 space-y-4 p-4 bg-dark-800/50 rounded-lg border border-dark-700">
                  <div>
                    <label htmlFor="seed" className="block text-sm font-medium text-gray-300 mb-1">
                      Seed (set to -1 for random)
                    </label>
                    <input
                      type="number"
                      id="seed"
                      className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      {...register('seed', { valueAsNumber: true })}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <label htmlFor="guidance_scale" className="block text-sm font-medium text-gray-300 mb-1">
                        Guidance Scale
                      </label>
                      <Controller
                        name="guidance_scale"
                        control={control}
                        render={({ field }) => (
                          <span className="text-sm text-gray-400">{field.value}</span>
                        )}
                      />
                    </div>
                    <Controller
                      name="guidance_scale"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="0.1"
                          onChange={field.onChange}
                          value={field.value}
                          className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                      )}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Creative</span>
                      <span>Accurate</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isGenerating || !sourceImage}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Transforming...
                </>
              ) : (
                <>
                  <Image className="h-5 w-5 mr-2" />
                  Transform Image
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-xl p-6 min-h-[300px] flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Image className="h-5 w-5 mr-2 text-primary-400" />
            Transformed Images
          </h2>

          {generatedImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 flex-grow">
              {generatedImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={imageUrl} 
                    alt={`Transformed image ${index + 1}`}
                    className="w-full h-auto rounded-lg object-cover border border-dark-700"
                  />
                  <button
                    onClick={() => handleDownload(imageUrl)}
                    className="absolute bottom-4 right-4 p-2 bg-dark-900/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-800"
                    aria-label="Download image"
                  >
                    <Download className="h-5 w-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
              <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No transformed images yet</h3>
              <p className="text-gray-400 max-w-xs">
                Upload a source image, add a transformation prompt, and click "Transform Image".
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ImageToImagePage;