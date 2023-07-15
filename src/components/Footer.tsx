import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    return (
        <footer className='flex flex-col text-black-100 bg-gray-200 mt-5 border-t border-gray-100'>
            <div className='flex justify-between items-center flex-wrap border-t sm:px-16 px-6 py-10'>
                <p>@2023 E-voting System. All rights reserved &copy;</p>

                <div className="footer__copyrights-link">
                    <Link href="/" className="text-gray-500 no-underline mx-2">
                        Privacy & Policy
                    </Link>
                    <Link href="/" className="text-gray-500 no-underline mx-2">
                        Terms & Condition
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer