import cow from './cow.jpg'
import rooster from './rooster.jpg'
import monkey from './monkey.jpg'
import crocs from './crocs.jpg'
import penguin from './penguin.jpg'
import lion from './lion.jpg'

// Sample images made with Text2AI, shown on the home page
export const showcase = [
    {image: lion, prompt: 'A majestic lion as a caped superhero, dramatic clouds, cinematic portrait'},
    {image: penguin, prompt: 'A penguin in red high-tech armor and a knitted scarf, studio lighting'},
    {image: rooster, prompt: 'A rooster dressed as a dark vigilante, golden emblem, shallow depth of field'},
    {image: monkey, prompt: 'A monkey wearing a golden horned crown and red cape, epic fantasy'},
    {image: crocs, prompt: 'A crocodile in a yellow masked hero cowl, glossy macro photo'},
    {image: cow, prompt: 'A white cow in a green mask and hero suit, soft overcast light'},
]

export const examplePrompts = [
    'A cozy reading nook inside a giant seashell, warm lamp light, ultra detailed',
    'Neon-lit Tokyo alley in the rain, reflections on wet pavement, cinematic',
    'An astronaut tending a tiny garden on the moon, soft pastel colors',
    'A fox made of autumn leaves running through a misty forest',
    'Isometric floating island with a waterfall and a small cabin, 3D render',
    'Portrait of an old fisherman, dramatic rim light, 85mm photo',
    'A steampunk owl with brass goggles perched on a stack of books',
    'Minimalist poster of a lighthouse at dusk, bold flat shapes',
]

// Appended to the prompt; '' means no style
export const stylePresets = [
    {id: 'none', label: 'No style', suffix: ''},
    {id: 'photo', label: 'Photo', suffix: 'photorealistic, natural lighting, 35mm photograph, highly detailed'},
    {id: 'cinematic', label: 'Cinematic', suffix: 'cinematic still, dramatic lighting, shallow depth of field, film grain'},
    {id: 'anime', label: 'Anime', suffix: 'anime style, vibrant colors, clean line art, studio quality'},
    {id: '3d', label: '3D render', suffix: '3D render, octane, soft global illumination, high detail'},
    {id: 'digital', label: 'Digital art', suffix: 'digital painting, concept art, trending on artstation'},
    {id: 'watercolor', label: 'Watercolor', suffix: 'watercolor painting, soft washes, paper texture'},
]
