import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import SingleTable from './components/pages/SingleTable/SingleTable';
import NotFound from './components/pages/NotFound/NotFound';
import { fetchTables } from './redux/tablesRedux';
import { fetchStatus } from './redux/StatusRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatus()), [dispatch]);

  return (
    <main>
     <Container>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:tableId" element={<SingleTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
     </Container>
   </main>
  )
}

export default App;
