import Link from 'next/link';
import { useAppContext } from './contexts/appContext';
import { BlueskySVG, GithubSVG, HashnodeSVG, LinkedinSVG, RssSVG, XSVG } from './icons';

export const SocialLinks = ({ isSidebar }: { isSidebar?: boolean }) => {
	const { publication } = useAppContext();
	const hasSocialLinks = publication?.links
		? !Object.values(publication.links!).every((val) => val === '')
		: false;
	return (
		<>
			<div
				className={`col-span-1 flex flex-row flex-wrap gap-2 text-slate-600 dark:text-neutral-300 md:flex-nowrap ${
					isSidebar ? 'justify-start' : 'justify-end'
				}`}
			>
				{hasSocialLinks && (
					<>
						{publication.links?.twitter && (
							<a
								href={publication.links.twitter}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Find us on Twitter, external website, opens in new tab"
								className="flex flex-row items-center justify-center rounded-full border border-slate-200 p-3 hover:bg-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-600 transition-colors"
							>
								<XSVG className="h-5 w-5 stroke-current" />
							</a>
						)}
						{publication.links?.github && (
							<a
								href={publication.links.github}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Find us on Github, external website, opens in new tab"
								className="flex flex-row items-center justify-center rounded-full border border-slate-200 p-3 hover:bg-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-600 transition-colors"
							>
								<GithubSVG className="h-5 w-5 stroke-current" />
							</a>
						)}
						{publication.links?.linkedin && (
							<a
								href={publication.links.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Find us on Linkedin, external website, opens in new tab"
								className="flex flex-row items-center justify-center rounded-full border border-slate-200 p-3 hover:bg-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-600 transition-colors"
							>
								<LinkedinSVG className="h-5 w-5 stroke-current" />
							</a>
						)}
						{publication.links?.hashnode && (
							<a
								href={publication.links.hashnode}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Find us on Hashnode, external website, opens in new tab"
								className="flex flex-row items-center justify-center rounded-full border border-slate-200 p-3 hover:bg-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-600 transition-colors"
							>
								<HashnodeSVG className="h-5 w-5 stroke-current" />
							</a>
						)}
						{publication.links?.bluesky && (
							<a
								href={publication.links.bluesky}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Find us on Bluesky, external website, opens in new tab"
								className="flex flex-row items-center justify-center rounded-full border border-slate-200 p-3 hover:bg-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-600 transition-colors"
							>
								<BlueskySVG className="h-5 w-5 stroke-current" />
							</a>
						)}
					</>
				)}

				<Link
					prefetch={false}
					href={`/rss.xml`}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Open blog XML Feed, opens in new tab"
					className="flex flex-row items-center justify-center rounded-full border border-slate-200 p-3 hover:bg-slate-100 dark:border-neutral-800 dark:hover:bg-neutral-600 transition-colors"
				>
					<RssSVG className="h-5 w-5 stroke-current" />
				</Link>
			</div>
		</>
	);
};
