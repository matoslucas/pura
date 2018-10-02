Example:

    <div>
      <Input field={{ error: state.error, touched: true, value: state.value, placeholder: state.placeholder }} disabled={state.disabled} label={state.label} />

      <Button onClick={() => setState({ placeholder: 'Placeholder text' })}>Show Placeholder</Button>
      <Button onClick={() => setState({ placeholder: null })}>Hide Placeholder</Button>
      <Button onClick={() => setState({ label: 'Label of the input' })}>Show Label</Button>
      <Button onClick={() => setState({ label: '' })}>Hide Label</Button>
      <Button onClick={() => setState({ disabled: true, value: 'disabled text' })}>Disable</Button>
      <Button onClick={() => setState({ disabled: false, value: null })}>enable</Button>
      <Button onClick={() => setState({ error: 'Must be an integer' })}>Show Error</Button>
      <Button onClick={() => setState({ error: 'Must be no more than 8 characters' })}>Show long Error</Button>
      <Button onClick={() => setState({ error: null })}>Hide Error</Button>
    </div>
