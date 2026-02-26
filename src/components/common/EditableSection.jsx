export function EditableSection({ sectionId, children }) {
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  return (
    <div id={sectionId} className="relative group scroll-mt-24">
      {children}
      {isInIframe && (
        <button
          type="button"
          onClick={() => {
            window.parent.postMessage({ type: 'EDIT_SECTION', sectionId }, '*');
          }}
          className="absolute top-4 left-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 text-[#722f37] rounded-full p-2 shadow-lg backdrop-blur-sm hover:bg-white cursor-pointer"
          title={`Edit ${sectionId}`}
          aria-label={`Edit section ${sectionId}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
    </div>
  );
}
