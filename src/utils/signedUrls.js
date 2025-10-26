import { supabase } from "../supabaseClient";

/**
 * Generate a signed URL for any provider file.
 * Works for resumes and ID documents.
 */
async function getSignedUrl(bucket, filename) {
  // all your files are stored under providers/
  const path = filename.startsWith("providers/")
    ? filename
    : `providers/${filename}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 3600); // 1 hour validity

  if (error) {
    console.error(`❌ Supabase error for ${bucket}/${path}:`, error.message);
    throw error;
  }

  return data.signedUrl;
}

/** Get signed URL for provider resume */
export async function getProviderResume(filename) {
  // pass only the file name: "provider1.pdf"
  return await getSignedUrl("resumes", filename);
}

/** Get signed URLs for provider ID documents */
export async function getProviderIDDocs(files = []) {
  const urls = [];
  for (const file of files) {
    try {
      const url = await getSignedUrl("id_docs", file);
      urls.push(url);
    } catch {
      console.warn(`⚠️ Missing or inaccessible file: ${file}`);
    }
  }
  return urls;
}
