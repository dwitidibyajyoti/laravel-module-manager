import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    headerAction?: ReactNode;
}

export default ({ children, breadcrumbs, headerAction, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {headerAction && (
            <div className="flex items-center gap-2 m-2">
                {headerAction}
            </div>
        )}
        {children}
    </AppLayoutTemplate>
);
