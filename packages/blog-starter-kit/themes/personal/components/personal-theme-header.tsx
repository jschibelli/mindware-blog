import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import { ToggleTheme } from './toggle-theme';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const PersonalHeader = () => {
	const { publication } = useAppContext();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const blogItem = { label: 'Blog', url: '/blog' };
	const servicesItem = { label: 'Services', url: '/services' };
	const allItems = [blogItem, servicesItem, ...navbarItems];
	const visibleItems = allItems.slice(0, 2);
	const hiddenItems = allItems.slice(2);

	const navList = (
		<ul className="flex list-none flex-row items-center gap-4 text-xs font-semibold uppercase tracking-tight text-neutral-600 dark:text-neutral-300">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
						{item.label}
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button>More</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="flex flex-col items-stretch gap-1 rounded-lg border bg-white text-xs font-semibold uppercase tracking-tight text-neutral-600 shadow-xl dark:border-neutral-800 dark:bg-neutral-900  dark:text-neutral-300"
								sideOffset={5}
								align="end"
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="block w-full p-2 hover:underline"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className="grid grid-cols-2 items-center gap-5">
			<div className="col-span-full md:col-span-1">
				<div className="flex justify-between">
					<h1>
						<Link
							className="flex flex-row items-center gap-2 text-lg font-bold leading-tight tracking-tight text-black dark:text-white"
							href="/"
							aria-label={`${publication.author.name}'s blog home page`}
						>
							{publication.author.profilePicture && (
								<img
									className="block h-8 w-8 rounded-full fill-current"
									alt={publication.author.name}
									src={resizeImage(publication.author.profilePicture, {
										w: 400,
										h: 400,
										c: 'face',
									})}
								/>
							)}
							{publication.title}
						</Link>
					</h1>
					<ToggleTheme className="md:hidden" />
				</div>
			</div>
			<div className="col-span-full flex flex-row items-center justify-between gap-4 md:col-span-1 md:justify-end">
				{/* Desktop Navigation */}
				<nav className="hidden md:block">{navList}</nav>
				
				{/* Mobile Menu Button */}
				<button
					className="md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					aria-label="Toggle mobile menu"
				>
					<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				
				<ToggleTheme className="hidden md:block" />
			</div>
			
			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="col-span-full md:hidden">
					<div className="mt-4 rounded-lg border bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
						<nav className="flex flex-col space-y-2">
							{allItems.map((item) => (
								<a
									key={item.url}
									href={item.url}
									className="block rounded px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.label}
								</a>
							))}
						</nav>
					</div>
				</div>
			)}
		</header>
	);
};
