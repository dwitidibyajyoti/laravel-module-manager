import UploadSimpleLayout from "./auth/upload-sample-layout";


export default function UploadLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <UploadSimpleLayout title={title} description={description} {...props}>
            {children}
        </UploadSimpleLayout>
    );
}
