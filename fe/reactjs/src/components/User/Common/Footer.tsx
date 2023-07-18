import * as React from 'react';

export function Footer() {
    return (
        <>
            <div className="md:hidden bg-100"></div>
            <footer className="bg-white">
                <div className="container">
                    <div className="px-2 w-full md:flex md:py-1 md:justify-center py-1">
                        <p className="text-sm">&copy; 2023 Demo | WEB BÁN HÀNG - Nguyen Thanh Truong</p>
                    </div>
                </div>
            </footer>
            <div className="h-[52px] md:hidden">
            </div>
        </>
    );
}
