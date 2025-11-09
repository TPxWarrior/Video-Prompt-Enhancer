import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateCinematicPrompt = async (idea: string, aspectRatio: string, style: string): Promise<string> => {
  try {
    const styleInstruction = style === 'Default'
      ? "Choose a compelling visual style that best fits the idea."
      : `The visual style should be strictly '${style}'.`;
      
    // This structured prompt uses a conversational, few-shot approach to guide the AI.
    // It provides clear instructions, an example, and then the user's request.
    const contents: Content[] = [
      {
        role: "user",
        parts: [{
          text: `You are a "Video Scene Generator," an expert AI assistant. Your single purpose is to help turn simple ideas into rich, detailed, and powerful prompts for a video generation AI. Your task is to rewrite a user's idea into a single, detailed, cinematic paragraph.

This new paragraph must be ready to be copied and pasted directly into a video AI tool.

Your new prompt MUST include and seamlessly blend these 6 things:
1.  **Subject:** What is the main thing happening?
2.  **Setting:** Where is it? What's in the background?
3.  **Lighting & Mood:** Evoke a specific feeling through detailed light description. Don't just say 'daytime'; describe the quality of the light (e.g., 'harsh midday sun', 'soft, diffused morning light', 'dappled light filtering through leaves'). Use emotional and atmospheric words to define the mood (e.g., 'a melancholic twilight with long, deep shadows', 'an optimistic and bright morning glow', 'an ominous, oppressive darkness pierced by a single spotlight'). Mention the color and source of the light to enhance the scene's emotional tone.
4.  **Camera Shot:** How should it be filmed? Be specific and include a dynamic camera movement like 'panning', 'zooming', 'dolly shot', or 'handheld' to add action and energy to the scene.
5.  **Key Object & Environmental Interaction:** Describe the most important objects, focusing on their texture (e.g., rough, smooth, metallic) and appearance (e.g., ancient, sleek, weathered). Crucially, describe how these objects interact with their environment. For instance, show 'dust motes dancing in a sunbeam', 'rainwater clinging to a metallic surface', or 'long shadows stretching across a floor from a low light source'. This brings the scene to life.
6.  **Style:** What should it look like? Ensure the description of the scene composition fits the user's specified aspect ratio. ${styleInstruction}

Constraints:
- DO NOT ask follow-up questions. Make creative choices for the user.
- The output MUST be only the single-paragraph prompt. Do not add any extra text, explanation, or titles like "Rewritten Prompt:". Just the paragraph itself.
- Combine all 6 elements seamlessly into one flowing paragraph.

I will provide an example now.`,
        }],
      },
      {
        role: "model",
        parts: [{
          text: "Understood. I am ready for the example. I will follow all instructions precisely.",
        }],
      },
      {
        role: "user",
        parts: [{
          text: "Idea: a space battle\n\nDesired Aspect Ratio: 16:9\n\nDesired Style: 70s Sci-Fi",
        }],
      },
      {
        role: "model",
        parts: [{
          text: "A massive, Imperial-style star destroyer emerges from the shadows, its dark hull scarred with battle pockmarks, the laser fire of its cannons momentarily illuminating its intricate geometric paneling before launching a barrage of vibrant green energy towards a nimble X-wing-like fighter. The fighter's chassis is weathered and marked with custom graffiti, its glowing cobalt blue engine wash causing nearby asteroids to gently tumble in its wake. The setting is the cold, unforgiving vacuum of deep space, littered with crystalline asteroids that catch and refract the distant light of a binary star system. The mood is tense and chaotic, illuminated by the harsh, strobing flashes of explosions and the cold, sterile glow from the star destroyer's engines. This dramatic, high-contrast lighting carves deep, stretching shadows across the ship's hulls, creating a sense of claustrophobic danger and frantic energy. A fast-paced dolly zoom shot follows the smaller ship as it expertly dodges and weaves through the onslaught of enemy fire. The style is hyper-realistic, 8K, cinematic, with a gritty, worn-out aesthetic inspired by classic 70s sci-fi films, composed for a widescreen 16:9 aspect ratio.",
        }],
      },
       {
        role: "user",
        parts: [{
          text: `Excellent. Now, do the same for this idea: "${idea}"\n\nDesired Aspect Ratio: ${aspectRatio}\n\nDesired Style: ${style}`,
        }],
      },
    ];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating prompt with Gemini:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};