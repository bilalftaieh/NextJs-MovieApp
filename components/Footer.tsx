import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-4 ">
            <div className="flex flex-col items-center gap-3 text-custom-three">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                    <Link href="https://github.com/bilalftaieh/NextJs-MovieApp">
                        <p className="text-sm hover:text-white">bilalftaieh/NextJs-MovieApp</p>
                    </Link>
                </div>
                <div className="flex items-center space-x-2">
                    <Image src="/tmdb-logo.svg" alt="TMDB Logo" width={50} height={50} />
                    <p className="text-xs">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                </div>
            </div>
        </footer>
    );
}