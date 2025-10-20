const pickClientID = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf', // only allow PDF files
  });

  if (result.type === 'success') {
    console.log('File picked:', result.uri);

    // Convert the picked file into a blob
    const response = await fetch(result.uri);
    const blob = await response.blob();

    // Generate a unique file name
    const fileName = `client_${Date.now()}.pdf`;

    // Upload the file to Supabase Storage → clients bucket → id_documents folder
    const { data, error } = await supabase
      .storage
      .from('clients') // your clients bucket
      .upload(`id_documents/${fileName}`, blob);

    if (error) {
      console.log('Upload error:', error);
      alert('Upload failed!');
    } else {
      console.log('File uploaded:', data);
      alert('File uploaded successfully!');
    }
  } else {
    console.log('File picking cancelled');
  }
};
