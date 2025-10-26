import { supabase } from './supabaseNodeClient.js';

async function testStorage() {
  console.log('🧪 Testing Supabase Storage...');

  const paths = [
    'providers/provider1.pdf',
    'providers/provider1_id.jpg',
    'providers/provider1_selfie.jpg'
  ];

  for (const path of paths) {
    const bucket = path.endsWith('.pdf') ? 'resumes' : 'id_docs';
    console.log(`\n🔍 Checking ${bucket}/${path}`);
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(path, 60);

    if (error) {
      console.error(`❌ Error for ${bucket}/${path}:`, error.message);
    } else {
      console.log(`✅ Success:`, data.signedUrl);
    }
  }
}

testStorage();
