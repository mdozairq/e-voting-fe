import Image from "next/image"
import RouterButton from "./RouterButton"
import { Roles } from "@/lib/types"


const Hero = () => {
    

    return (
        <div className="hero">
            <div className="flex-1 pt-24 padding-x">
                <h1 className="hero__title">Vote, with transperancy for - Bright Future! </h1>
                <p className="hero__subtitle">Moving to the future, Introducing the decentralized voting application using smart contracts for each ballot </p>
                <div className="flex justify-evenly flex-wrap">
                    <RouterButton
                        title="VOTERS"
                        containerStyle="bg-primary-blue text-white rounded-full mt-5 cursor-pointer"
                        path="/voter"
                        role={Roles.VOTER}
                    />
                    <RouterButton
                        title="CANDIDATES"
                        containerStyle="bg-secondary-orange text-white rounded-full mt-5 cursor-pointer"
                        path="/candidate"
                        role={Roles.CANDIDATE}
                    />
                    <RouterButton
                        title="ADMIN"
                        containerStyle="bg-indigo-500 text-white rounded-full mt-5 cursor-pointer"
                        path="/admin"
                        role={Roles.ADMIN}
                    />
                </div>
            </div>
            <div className="hero__image-container">
                <div className="hero__image">
                    <Image
                        src="/hero.png"
                        fill
                        className="object-contain"
                        alt="Hero image"
                    />
                    <div className="hero__image-overlay"></div>
                </div>
            </div>
        </div>
    )
}

export default Hero