import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Video, AlertCircle, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { textToVideo } from '../services/segmindService';

interface FormData {
  prompt: string;
  negative_prompt: string;
  guidance_scale: number;
  width: number;
  height: number;
  num_frames: number;
  fps: number;
  seed: number;
}

const aspectRatios = [
  { width: 512, height: 512, label: 'Square (1:1)' },
  { width: 640, height: 360, label: 'Landscape 16:9' },
  { width: 360, height: 640, label: 'Portrait 9:16' },
  { width: 512, height: 384, label: 'Landscape 4:3' },
];

const TextToVideoPage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const { control, handleSubmit, register, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      prompt: '',
      negative_prompt: 'blurry, low quality, low resolution, bad lighting',
      guidance_scale: 7.5,
      width: 512,
      height: 512,
      num_frames: 24,
      fps: 8,
      seed: -1,
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    try {
      const toastId = toast.loading('Generating your video... This might take a minute.');
      
      const videoData = await textToVideo({
        prompt: data.prompt,
        negative_prompt: data.negative_prompt,
        guidance_scale: data.guidance_scale,
        width: data.width,
        height: data.height,
        num_frames: data.num_frames,
        fps: data.fps,
        seed: data.seed === -1 ? Math.floor(Math.random() * 1000000) : data.seed,
      });
      
      toast.success('Video generated successfully!', { id: toastId });
      setGeneratedVideo(videoData);
    } catch (error) {
      console.error('Error generating video:', error);
      toast.error('Failed to generate video. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAspectRatioChange = (width: number, height: number) => {
    setValue('width', width);
    setValue('height', height);
  };

  const handleDownload = () => {
    if (!generatedVideo) return;
    
    const link = document.createElement('a');
    link.href = generatedVideo;
    link.download = `dimensify-video-${Date.now()}.mp4`;
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
            Text to Video
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Bring your ideas to life with our AI-powered text-to-video generator.
          Describe the video you want to create and watch it come to life.
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
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">
                Prompt
              </label>
              <textarea
                id="prompt"
                rows={3}
                placeholder="Describe the video you want to create..."
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {aspectRatios.map((ratio) => (
                  <button
                    key={`${ratio.width}x${ratio.height}`}
                    type="button"
                    className={`p-2 text-xs rounded-lg border transition-colors ${
                      control._formValues.width === ratio.width && control._formValues.height === ratio.height
                        ? 'border-primary-500 bg-primary-900/20 text-white'
                        : 'border-dark-700 bg-dark-800 text-gray-400 hover:border-primary-400/50'
                    }`}
                    onClick={() => handleAspectRatioChange(ratio.width, ratio.height)}
                  >
                    {ratio.label}
                    <div className="text-[10px] mt-1 text-gray-500">
                      {ratio.width}x{ratio.height}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between">
                  <label htmlFor="num_frames" className="block text-sm font-medium text-gray-300 mb-1">
                    Number of Frames
                  </label>
                  <Controller
                    name="num_frames"
                    control={control}
                    render={({ field }) => (
                      <span className="text-sm text-gray-400">{field.value}</span>
                    )}
                  />
                </div>
                <Controller
                  name="num_frames"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="range"
                      min="16"
                      max="32"
                      step="4"
                      onChange={field.onChange}
                      value={field.value}
                      className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  )}
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="fps" className="block text-sm font-medium text-gray-300 mb-1">
                    FPS
                  </label>
                  <Controller
                    name="fps"
                    control={control}
                    render={({ field }) => (
                      <span className="text-sm text-gray-400">{field.value}</span>
                    )}
                  />
                </div>
                <Controller
                  name="fps"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="range"
                      min="6"
                      max="12"
                      step="2"
                      onChange={field.onChange}
                      value={field.value}
                      className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  )}
                />
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
                          max="15"
                          step="0.5"
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Video...
                </>
              ) : (
                <>
                  <Video className="h-5 w-5 mr-2" />
                  Generate Video
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
            <Video className="h-5 w-5 mr-2 text-primary-400" />
            Generated Video
          </h2>

          {generatedVideo ? (
            <div className="flex flex-col flex-grow">
              <div className="relative rounded-lg overflow-hidden border border-dark-700 bg-dark-800 flex-grow">
                <video 
                  src={generatedVideo}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={handleDownload}
                  className="absolute bottom-4 right-4 p-2 bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-dark-800 transition-colors"
                  aria-label="Download video"
                >
                  <Download className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
              <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4">
                <Video className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No video generated yet</h3>
              <p className="text-gray-400 max-w-xs">
                Fill in the form and click "Generate Video" to create your first video.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TextToVideoPage;
