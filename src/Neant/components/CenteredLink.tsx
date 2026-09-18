

interface CenteredLinkProps {
    readonly href: string;
    readonly children: React.ReactNode;
}


export function CenteredLink({href, children} : CenteredLinkProps) {

    return (<div className="flex justify-center items-center text-center text-white mx-auto border-2 border-white bg-transparent px-4 py-2 transition-colors duration-300 ease-in-out my-auto hover:scale-105 hover:ring-4 ring-gray-600">
        <a href={href} rel="noreferrer" target="_blank">
            {children}
        </a>
    </div>)


}