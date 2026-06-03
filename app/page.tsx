import UploadForm from '@/components/forms/UploadForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Document Processor</h1>
        <p className="text-gray-600 mb-8">
          Upload documents. AI extracts key information, generates summaries, and makes them searchable.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload a Document</h2>
          <UploadForm />
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-800">1. Upload</h3>
            <p className="text-gray-600 text-sm mt-2">Drag & drop PDFs or DOCX files</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-800">2. Analyze</h3>
            <p className="text-gray-600 text-sm mt-2">AI extracts text & generates tags</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-gray-800">3. Search</h3>
            <p className="text-gray-600 text-sm mt-2">Find documents semantically</p>
          </div>
        </div>
      </div>
    </main>
  );
}