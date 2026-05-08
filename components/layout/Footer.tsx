export default function Footer() {
    return (
        <footer className="h-[146px] bg-black-custom flex justify-center">
            <div className="w-[1440px] h-full px-[55px] py-[21px] flex items-center justify-center gap-[120px]">
                {/* Left block */}
                <div className="w-[348px] h-[90px] flex items-center gap-[15px]">
                    <img
                        src="/logo.png"
                        alt="Toxicity Detector"
                        className="w-[90px] h-[90px] bg-white-custom object-contain"
                    />

                    <div className="w-[117px] h-[40px]flex flex-col gap-[3px]">
                        <p className="text-[8px] leading-[12px] font-bold text-white-custom">
                            Copyright © 2020 <br />
                            Landify UI Kit.
                        </p>

                        <p className="text-[8px] leading-[12px] font-bold text-white-custom">
                            All rights reserved
                        </p>
                    </div>

                    <div className="w-[113px] h-[38px] flex items-center gap-[5px]">
                        <img
                            src="icons footer/social icons instagram.png"
                            alt="instagram"
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white-custom"
                        />
                        <img
                            src="icons footer/social icons web.png"
                            alt="web"
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white-custom"
                        />
                        <img
                            src="icons footer/social icons twitter.png"
                            alt="twitter"
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-white-custom"
                        />
                    </div>
                </div>

                {/* Right block */}
                <div className="w-[377px] h-[68px] flex items-start gap-[10px] text-white-custom">
                    <div className="w-[100px] flex flex-col gap-[8px]">
                        <h4 className="text-[21.37px] leading-[25.4px] font-semibold">
                            Company
                        </h4>
                        <div className="h-[34px] flex flex-col gap-[4px] text-[12.02px] leading-[14.7px] font-semibold">
                            <p>About us</p>
                            <p>Contact us</p>
                        </div>
                    </div>

                    <div className="w-[98px] flex flex-col gap-[8px]">
                        <h4 className="text-[21.37px] leading-[25.4px] font-semibold">
                            Support
                        </h4>
                        <div className="h-[34px] flex flex-col gap-[4px] text-[12.02px] leading-[14.7px] font-semibold">
                            <p>Help center</p>
                            <p>Terms of service</p>
                        </div>
                    </div>

                    <div className="w-[159px] h-[51px] flex flex-col gap-[8px]">
                        <h4 className="text-[21.37px] leading-[25.4px] font-semibold">
                            Stay up to date
                        </h4>

                        <div className="w-[131px] h-[16px] bg-silver/20 rounded-[2.67px] flex items-center justify-between px-[14px]">
                            <span className="text-[9.35px] leading-[12px] font-bold text-white-custom">
                                Your email address
                            </span>
                            <img
                                src="icons footer/send.png"
                                alt="send"
                                className="w-[5.51px] h-[5.51px]"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}