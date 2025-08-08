import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import UploadModule from '@/components/upload-module';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [showUploadModal, setShowUploadModal] = useState(false);

    const [modules, setModules] = useState<any[]>([])

    useEffect(() => {
        const loadModules = async () => {
            try {
                const res = await fetch('/modules')
                const data = await res.json()
                setModules(data)
            } catch (err) {
                console.error('Failed to fetch modules:', err)
            }
        }

        loadModules()
    }, []);

    console.log(`Modules: ${modules}`);

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
            headerAction={
                <Button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Module
                </Button>
            }
        >
            <Head title="Dashboard" />

            <div className="grid auto-rows-min gap-4 md:grid-cols-3 p-4">
                {modules.map((mod, i) => (
                    <div
                        key={i}
                        className="relative p-4 bg-white dark:bg-neutral-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border shadow"
                    >
                        <h3 className="text-lg font-bold mb-2">{mod.name}</h3>
                        <p>Status: <span className={mod.enabled ? 'text-green-500' : 'text-red-500'}>
                            {mod.enabled ? 'Enabled' : 'Disabled'}
                        </span></p>
                        <p>Migrations: {mod.has_migrations ? 'Yes' : 'No'}</p>

                        <div className="mt-4 flex gap-2 flex-wrap">
                            <button
                                onClick={async () => {
                                    await fetch(`/modules/${mod.name}/${mod.enabled ? 'disable' : 'enable'}`, {
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                                        }
                                    });
                                    location.reload(); // or re-fetch modules
                                }}
                                className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {mod.enabled ? 'Disable' : 'Enable'}
                            </button>

                            <button
                                onClick={async () => {
                                    if (confirm(`Delete ${mod.name}?`)) {
                                        await fetch(`/modules/${mod.name}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                                            }
                                        });
                                        location.reload();
                                    }
                                }}
                                className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>

                            <button
                                onClick={async () => {
                                    await fetch(`/modules/${mod.name}/migrate`, {
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                                        }
                                    });
                                    alert('Migration triggered!');
                                }}
                                className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Migrate
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {[...Array(1)].map((_, i) => (
                        <div
                            key={i}
                            className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    ))}
                </div> */}

                {/* <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>



            {/* Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-md shadow-lg w-full max-w-md mx-auto">
                        <h2 className="text-xl font-semibold mb-4 text-center">Upload Module</h2>

                        <UploadModule />

                        <div className="mt-4 ">
                            <Button onClick={() => setShowUploadModal(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
