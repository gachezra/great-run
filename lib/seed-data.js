import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function seedDatabase() {
  const editions = [
    {
      title: 'The Great Run XVIII: The Phoenix Edition',
      slug: 'the-phoenix-edition',
      excerpt: 'Rising from the dust, our 18th edition was an unforgettable journey through winding mountain passes and stunning desert landscapes. This run supported the "Wildlife Warriors" foundation.',
      content: `<p>The Phoenix Edition marked our 18th incredible journey, taking us through some of the most breathtaking terrain we've ever encountered. As the sun rose over the desert horizon, our convoy of passionate drivers embarked on a 1,200-kilometer adventure that would test both machine and spirit.</p>

<p>The route took us through winding mountain passes where the air grew thin and the views stretched endlessly. Each hairpin turn revealed new vistas of rugged beauty, with ancient rock formations standing sentinel over valleys carpeted in desert wildflowers.</p>

<p>This edition was particularly special as all proceeds went to support the Wildlife Warriors foundation, an organization dedicated to protecting endangered species in their natural habitats. Our drivers raised over $45,000, which will go directly toward anti-poaching efforts and habitat conservation.</p>

<p>The camaraderie among participants was palpable, with evening campfires bringing together enthusiasts from all walks of life, united by their love of the open road and commitment to making a difference.</p>`,
      featured_image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
      gallery_images: JSON.stringify([
        'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
        'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg',
        'https://images.pexels.com/photos/2526127/pexels-photo-2526127.jpeg'
      ])
    },
    {
      title: 'The Great Run XVII: Coastal Cruise',
      slug: 'coastal-cruise',
      excerpt: 'We chased the horizon on our 17th run, a breathtaking drive along the coast. All proceeds went to the "Ocean Cleanup" initiative.',
      content: `<p>The Coastal Cruise edition delivered everything its name promised and more. For five glorious days, our fleet of automotive excellence hugged the coastline, with the azure waters of the ocean providing a stunning backdrop to an unforgettable driving experience.</p>

<p>Starting at dawn with mist rolling off the sea, we navigated coastal highways that serpentined along dramatic cliffs and hidden coves. The sound of waves crashing against rocks mixed with the purr of finely-tuned engines created a symphony that resonated with every driver's soul.</p>

<p>This edition was dedicated to supporting the Ocean Cleanup initiative, and our community rose to the challenge magnificently. Through registration fees, donations, and a charity auction featuring rare automotive memorabilia, we raised $52,000 to help remove plastic from our oceans.</p>

<p>Memorable moments included a sunrise stop at Lighthouse Point, where participants shared stories over fresh coffee, and an impromptu beach cleanup that saw our entire convoy pitch in to make a immediate positive impact on the environment we were celebrating.</p>`,
      featured_image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg',
      gallery_images: JSON.stringify([
        'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg',
        'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg',
        'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg',
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg'
      ])
    },
    {
      title: 'The Great Run XVI: Mountain Majesty',
      slug: 'mountain-majesty',
      excerpt: 'An epic high-altitude adventure through alpine passes, supporting children\'s education programs in mountain communities.',
      content: `<p>Mountain Majesty took us to new heights, literally and figuratively. This challenging edition saw our convoy tackle some of the most demanding mountain roads in the region, with elevations reaching over 3,000 meters above sea level.</p>

<p>The thin air and switchback roads tested both drivers and their vehicles, but the rewards were immeasurable. Snow-capped peaks, crystal-clear alpine lakes, and charming mountain villages greeted us at every turn.</p>

<p>This run raised $38,000 for children's education programs in remote mountain communities, providing school supplies, books, and technology to help bridge the educational gap faced by children in isolated regions.</p>`,
      featured_image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
      gallery_images: JSON.stringify([
        'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg',
        'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg',
        'https://images.pexels.com/photos/2526127/pexels-photo-2526127.jpeg',
        'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
      ])
    }
  ];

  const sponsors = [
    {
      name: 'Apex Automotive',
      logo_url: 'https://via.placeholder.com/200x100/1e293b/60a5fa?text=Apex+Automotive',
      website: 'https://apexautomotive.example.com',
      display_order: 1
    },
    {
      name: 'Velocity Tires',
      logo_url: 'https://via.placeholder.com/200x100/1e293b/60a5fa?text=Velocity+Tires',
      website: 'https://velocitytires.example.com',
      display_order: 2
    },
    {
      name: 'Driftwood Hotels',
      logo_url: 'https://via.placeholder.com/200x100/1e293b/60a5fa?text=Driftwood+Hotels',
      website: 'https://driftwoodhotels.example.com',
      display_order: 3
    },
    {
      name: 'Summit Insurance',
      logo_url: 'https://via.placeholder.com/200x100/1e293b/60a5fa?text=Summit+Insurance',
      website: 'https://summitinsurance.example.com',
      display_order: 4
    }
  ];

  for (const edition of editions) {
    await supabase.from('editions').insert(edition);
  }

  for (const sponsor of sponsors) {
    await supabase.from('sponsors').insert(sponsor);
  }

  console.log('Database seeded successfully!');
}
