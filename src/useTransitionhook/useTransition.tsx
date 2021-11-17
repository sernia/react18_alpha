const App = () => {
  // ...

  const [isPending, startTransition] = useTransition({ timeoutMs: 2000 });

  startTransition(() => {
    setSearchQuery(input);
  });

  // ...

  return (
    <span>
      {isPending ? " Loading..." : null}
      {/* ... */}
    </span>
  );
};
