import { useState, DragEvent, ChangeEvent, FormEventHandler, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import UploadLayout from '@/layouts/upload-layout';

const UploadModule = () => {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
            setError('');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError('');
        }
    };

    const handleUpload: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a .zip file');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('module', file);
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        try {
            const res = await fetch('/modules/upload', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token ?? '',
                },
                body: formData,
                credentials: 'include', // ✅ VERY IMPORTANT

            });

            const data = await res.json();
            alert('Uploaded!');
            setFile(null);
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <UploadLayout
            title="Upload a Module"
            description="Upload a .zip file to add a new module to the system"
        >
            {/* <Head title="Upload Module" /> */}

            <form className="flex flex-col gap-6" onSubmit={handleUpload}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="module">Select .zip File</Label>
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`relative flex items-center justify-center h-32 w-full rounded-md border-2 border-dashed ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-input'
                                }`}
                        >
                            <p className="text-sm text-muted-foreground">
                                {file ? file.name : 'Drag & drop or click to upload a .zip file'}
                            </p>
                            <Input
                                id="module"
                                type="file"
                                accept=".zip"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <InputError message={error} />
                    </div>

                    <Button type="submit" className="w-full" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload Module'}
                    </Button>
                </div>
            </form>
        </UploadLayout>
    );
};

export default UploadModule;
