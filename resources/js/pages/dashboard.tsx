import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import UploadModule from '@/components/upload-module';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [showUploadModal, setShowUploadModal] = useState(false);

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
            <Head title="Dashboard-099" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    ))}
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
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
