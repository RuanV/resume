// @flow strict

import { skillsData } from "@/utils/data/skills";
import { skillExperience } from "@/utils/data/skill-experience";
import { skillTags } from "@/utils/data/skill-tags";
import { skillsImage } from "@/utils/skill-image";
import { frameworks } from "@/utils/data/frameworks";
import Image from "next/image";
import Marquee from "react-fast-marquee";

function Skills() {
	return (
		<div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
			<div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

			<div className="flex justify-center -translate-y-[1px]">
				<div className="w-3/4">
					<div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
				</div>
			</div>

			<div className="flex justify-center my-5 lg:py-8">
				<div className="flex  items-center">
					<span className="w-24 h-[2px] bg-[#1a1443]"></span>
					<span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
						Skills
					</span>
					<span className="w-24 h-[2px] bg-[#1a1443]"></span>
				</div>
			</div>

			<div className="w-full my-12">
				<Marquee
					gradient={false}
					speed={80}
					pauseOnHover={true}
					pauseOnClick={true}
					delay={0}
					play={true}
					direction="left"
				>
					{skillsData.map((skill, id) => (
						<div className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
							key={id}>
							<div className="h-full w-full rounded-lg border border-[#1f223c] bg-[#11152c] shadow-none shadow-gray-50 group-hover:border-violet-500 transition-all duration-500">
								<div className="flex -translate-y-[1px] justify-center">
									<div className="w-3/4">
										<div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
									</div>
								</div>
								<div className="flex flex-col items-center justify-center gap-3 p-6">
									<div className="h-8 sm:h-10">
										<Image
											src={skillsImage(skill)?.src}
											alt={skill}
											width={40}
											height={40}
											className="h-full w-auto rounded-lg"
										/>
									</div>
									<p className="text-white text-sm sm:text-lg">
										{skill}
									</p>
								</div>
							</div>
						</div>
					))}
				</Marquee>
			</div>

			{/* Experience bars */}
			<div className="mt-10 mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
				{skillExperience.map(({ name, years }, i) => {
					const maxYears = 15;
					const safeYears = Math.min(Math.max(years, 0), maxYears);
					const percent = (safeYears / maxYears) * 100;
					return (
						<div key={i} className="w-full">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-gray-200">{name}</span>
								<span className="text-xs text-gray-400">{safeYears}+ yrs</span>
							</div>
							<div className="h-2 w-full bg-[#1f223c] rounded">
								<div
									className="h-2 rounded bg-gradient-to-r from-pink-500 to-violet-600"
									style={{ width: `${percent}%` }}
								/>
							</div>
						</div>
					);
				})}
			</div>

			{/* Tags row */}
			<div className="mt-8 flex flex-wrap justify-center gap-3">
				{skillTags.map((tag, i) => (
					<span key={i} className="px-3 py-1 rounded-full border border-[#1f223c] bg-[#0d1224] text-xs text-gray-200">
						{tag}
					</span>
				))}
			</div>

			{/* Frameworks row */}
			<div className="mt-10 mx-auto max-w-3xl">
				<div className="flex items-center justify-center mb-4">
					<span className="w-24 h-[2px] bg-[#1a1443]"></span>
					<span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-base rounded-md">Frameworks</span>
					<span className="w-24 h-[2px] bg-[#1a1443]"></span>
				</div>
				<div className="flex flex-wrap justify-center gap-4">
					{frameworks.map((fw, i) => {
						const imgObj = skillsImage(fw);
						return (
							<div key={i} className="px-4 py-2 rounded-lg border border-[#1f223c] bg-[#11152c] flex items-center gap-3">
								{imgObj?.src ? (
									<Image src={imgObj.src} alt={fw} width={24} height={24} className="h-6 w-6" />
								) : (
									<div className="h-6 w-6 rounded bg-[#1f223c] text-[10px] flex items-center justify-center text-gray-300">
										{fw.split(' ').map(w => w[0]).join('').slice(0, 3)}
									</div>
								)}
								<span className="text-xs text-gray-200">{fw}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Skills;