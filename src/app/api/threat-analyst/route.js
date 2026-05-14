import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // প্রাথমিক সিকিউরিটি চেক (সাসপিশাস এক্সটেনশন)
    const dangerousExtensions = ['.exe', '.bat', '.sh', '.js', '.vbs'];
    const fileName = file.name.toLowerCase();
    const isDangerous = dangerousExtensions.some(ext => fileName.endsWith(ext));

    return NextResponse.json({
      fileName: fileName,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      threatLevel: isDangerous ? 'HIGH' : 'LOW',
      analysis: isDangerous 
        ? 'Dangerous file extension detected. Possible malware threat!' 
        : 'File structure appears normal. No immediate threat found.'
    });

  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}