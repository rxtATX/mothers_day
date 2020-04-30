import React, { useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels({ onChange, name, checked }) {
  const [state, setState] = React.useState(checked);

  const handleChange = (event) => {
    setState(event.target.checked);
  };

  useEffect(() => {
    onChange(state)
  }, [state])

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state}
            onChange={handleChange}
            name={name}
            color="primary"
          />
        }
        label={name}
      />
    </FormGroup>
  );
}