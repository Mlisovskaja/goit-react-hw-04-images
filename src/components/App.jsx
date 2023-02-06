import { useState, useEffect, useCallback } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ModalImage from './ImageGallery/ModalImage/ModalImage';
import Button from './Shared/Button/Button';
import Modal from './Shared/Modal/Modal';
import Loader from './Shared/Loader/Loader';

import { searchPics } from './Shared/PicsApi';

const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchPics = async () => {
      try {
        setLoading(true);
        const data = await searchPics(search, page);
        setItems(prevItems => [...prevItems, ...data]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPics();
  }, [search, page, setLoading, setItems, setError, setLoading, searchPics]);

  const onSearchPics = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const handleClick = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const openModal = useCallback(({ largeImageURL, tags }) => {
    setModalImage({ largeImageURL, tags });
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Searchbar onSubmit={onSearchPics} />
      <ImageGallery items={items} openModal={openModal} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {Boolean(items.length) && <Button onClick={handleClick} />}
      {showModal && (
        <Modal close={closeModal}>
          <ModalImage {...modalImage} />
        </Modal>
      )}
    </>
  );
};

export default App;
