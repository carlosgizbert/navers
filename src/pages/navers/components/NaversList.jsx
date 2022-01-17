import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import './NaverList.css'
import api from '../../../api'



const CardsNavers = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
	const [clickedModal, setClickedModal] = useState(null)
	const [navers, setNavers] = useState([]);
	const token = localStorage.getItem('token')
	useEffect(() => {
		const getNavers = async () => {
		await api.get('/navers' , { headers: {"Authorization" : `Bearer ${token}`} })
		.then(res => {
			const { data } = res
			setNavers(data)
		})
		} 
	getNavers()

	}, [])

  function handleOpenModal(naverId) {
		setClickedModal(naverId)
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }

	const modalCustomStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			transform: 'translate(-50%, -50%)',
			padding: '0',
			border: 'none',
			margin: '0',
			width: '1007px',
			height: 'auto',
			borderRadius: '0'
		},
	}

	const replaceBrokenImage = (e) => {
		e.target.src = 'https://images.unsplash.com/photo-1533241818630-edad657eb3da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
	}

		// CARD RETURN
    return(
      navers.map(naver => 
      <div key={naver.id} className='card'>
      <img 
			alt={naver.name} 
			className="img" 
			src={naver.url} 
			onClick={(e) => handleOpenModal(naver.id)} 
			onError={replaceBrokenImage}></img>
      <div className='details'>
        <div  className='name'>
          {naver.name}
        </div>
        <div className="description">
          {naver.job_role}
        </div>
        <div className="actions">
					<div className="bt-delete">Excluir</div>
					<div className='bt-edit'>Editar</div>
        </div>
      </div>
			<Modal 
			isOpen={modalIsOpen && naver.id === clickedModal} 
			onRequestClose={handleCloseModal}
			style={modalCustomStyles} 
			ariaHideApp={false}
			>
        <div className="modal">
					<section className="image-wrapper">
					<img className="img" onError={replaceBrokenImage} alt={naver.name} src={naver.url}></img>
					</section>
					<section className="body">
						<div className="details-naver">
						<div className="name">{naver.name}</div>
						<div>{naver.job_role}</div>
						<div>
							<span>Idade</span>
							<div className="mt-00">{naver.birthdate}</div>
						</div>
						<div>
							<span>Tempo de empresa</span>
							<div className="mt-00">{naver.birthdate}</div>
						</div>
						<div>
							<span>Projetos que participou</span>
							<div className="mt-00">{naver.birthdate}</div>
						</div>
					</div>
					<div className="actions">
						<div className="bt-delete">Excluir</div>
						<div className="bt-edit">Edit</div>
					</div>
					</section>
					<div className="fechar" onClick={handleCloseModal}>x</div>
				</div>
      </Modal>
      </div>
      )
    )
		// FIM CARD RETURN
  }

const NaverList = () =>   {
  return (
    <section className="naver-list mt-10">
      <CardsNavers/>
    </section>
  )
}




export default NaverList
