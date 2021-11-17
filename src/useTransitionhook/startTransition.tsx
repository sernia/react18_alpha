const SUSPENSE_CONFIG = { timeoutMs: 1000 };
const RESOURCE_DELAY = 2000;

// function Resource({ id }) { ... }

function App() {
  const [id, setId] = useState(undefined);
  const [isPending, startTransition] = useTransition(SUSPENSE_CONFIG);

  const incrId = useCallback(() => {
    setId((id) => (id != null ? id + 1 : 0));
  }, []);

  return (
    <>
      <h1>{id != null ? `Resource ${id}` : "Example"}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {id != null ? <Resource id={id} /> : <div>Nothing loaded</div>}
      </Suspense>
      <button type="button" onClick={incrId}>
        Load WITHOUT Transition
      </button>
      <button type="button" onClick={() => startTransition(incrId)}>
        Load WITH Transition {isPending ? "(Pending...)" : null}
      </button>
    </>
  );
}