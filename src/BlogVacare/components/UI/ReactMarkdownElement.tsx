import ReactMarkdown from "react-markdown";

/**
 * Composant affichant du markdown
 */
interface ReactMarkdownElementProps {
    children: string;
    className?: string;
}

export function ReactMarkdownElement ({children, className = ""} : ReactMarkdownElementProps) {
    return <div className={className}>
        <ReactMarkdown
            components={{
                a: ({...props}) => (
                    <a {...props} className="underline hover:font-bold" target='_blank' rel="noopener noreferrer" />
                )
            }}>
            {children}
        </ReactMarkdown>
    </div>;
}