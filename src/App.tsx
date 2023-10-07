import LookupTable from './components/LookupTable';
import { Container } from '@mui/material';

function App() {
  return (
    <Container
      sx={{ marginTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <LookupTable />
    </Container>
  );
}

export default App;
