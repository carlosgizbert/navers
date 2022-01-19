import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import './NaverList.css';
import api from '../../../api';
import { useNavigate } from 'react-router-dom'
import { ReactComponent as IconEdit } from '../../components/svg/icon-edit.svg'
import { ReactComponent as IconRemove }from '../../components/svg/icon-trash.svg'
import { ReactComponent as IconClose }from '../../components/svg/icon-x.svg'

const CardsNavers = () => {
const [modalNaver, setModalNaver] = useState(false)
const [modalConfirmDelete, setModalConfirmDelete] = useState(false)
const [modalDeleteSucess, setModalDeleteSuccess] = useState(false)
const [currentNaver, setCurrentNaver] = useState(null)
const [loading, setLoading] = useState(true)
const [navers, setNavers] = useState([])
const navigate = useNavigate();
const token = localStorage.getItem('token')

	const getNavers = async () => {
	await api.get('/navers' , { headers: {"Authorization" : `Bearer ${token}`} })
	.then(res => {
		const { data } = res
		setNavers(data)
		setLoading(false)
	})
	} 
	useEffect(() => {

	getNavers()
	}, [token])

	// modal naver - refatorar
	const modalNaverCustomStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			transform: 'translate(-50%, -50%)',
			padding: '0',
			border: 'none',
			margin: '0',
			borderRadius: '0',
		},
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)'
		}
	}

	const handleOpenModalNaver = (naverId) => {
		setCurrentNaver(naverId)
    setModalNaver(true)
  }

  const handleCloseModalNaver = () => {
    setModalNaver(false)
		setModalConfirmDelete(false)
  }

	// axios delete naver
	const deleteNaver = async (idNaver) => {
		await api.delete('/navers/'+idNaver, { headers: {"Authorization" : `Bearer ${token}`}}).then(
		res => {
			if(res.data){
				getNavers()
				handleOpenModalDeleteSuccess()
			}else{
				console.log(res)
			}
		}
		).catch(e => console.log("Erro no catch"+e))
	}

	// modal confirm delete - refatorar
	const modalConfirmDeleteCustomStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			transform: 'translate(-50%, -50%)',
			padding: '2rem',
			border: 'none',
			margin: '0',
			height: 'auto',
			borderRadius: '0',
		},
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)'
		}
	}

	const handleOpenModalConfirmDelete = (naverId) => {
		setCurrentNaver(naverId)
    setModalConfirmDelete(true)
		setModalNaver(false)
  }

  const handleCloseModalConfirmDelete = () => {
    setModalConfirmDelete(false)
  }

	// modal delete success - refatorar
	const modalConfirmDeleteSuccessCustomStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			transform: 'translate(-50%, -50%)',
			padding: '2rem 2rem 3rem 2rem',
			border: 'none',
			margin: '0',
			height: 'auto',
			borderRadius: '0'
		},
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)'
		}
	}

	const handleOpenModalDeleteSuccess = () => {
		setModalConfirmDelete(false)
		setModalDeleteSuccess(true)
	}
	
	const handleCloseModalDelSuccess = () =>{
		setModalDeleteSuccess(false)
		setNavers(navers)
	}

	const replaceBrokenImage = (e) => {
		e.target.src = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
	}

	const handleOpenEditNaver = (naverId) => {
		navigate('/navers/editar/'+naverId)
	}

	const isoToYear = (birthdateIso) => {
    birthdateIso = parseInt(birthdateIso.toString().substring(0, 10))
    const currentYear = new Date().getFullYear()
    const age =  currentYear - birthdateIso
    return age
  }

	const NaversSuccess = () => {
		return navers.map(naver => 
			<div key={naver.id} className='card'>
				<img 
					alt={naver.name} 
					className="img" 
					src={naver.url} 
					onClick={(e) => handleOpenModalNaver(naver.id)} 
					onError={replaceBrokenImage}>
				</img>
				<div className='details'>
					<div className='name'>
						{naver.name}
					</div>
					<div className="description">
						{naver.job_role}
					</div>
					<div className="actions">
						<div className="bt-icon" onClick={() => handleOpenModalConfirmDelete(naver.id)}><IconRemove/></div>
						<div className='bt-icon' onClick={() => handleOpenEditNaver(naver.id)}><IconEdit/></div>
					</div>
				</div>
			<Modal
			name="details-naver" 
			isOpen={modalNaver && naver.id === currentNaver} 
			onRequestClose={handleCloseModalNaver}
			style={modalNaverCustomStyles} 
			ariaHideApp={false}
			>
				<div className="modal-naver">
					<section className="image-wrapper">
					<img className="img" onError={replaceBrokenImage} alt={naver.name} src={naver.url}></img>
					</section>
					<section className="body">
						<div className="details-naver">
						<div className="name">{naver.name}</div>
						<div>{naver.job_role}</div>
						<div>
							<span>Idade</span>
							<div className="mt-00">{isoToYear(naver.birthdate)}</div>
						</div>
						<div>
							<span>Tempo de empresa</span>
							<div className="mt-00">{isoToYear(naver.admission_date)}</div>
						</div>
						<div>
							<span>Projetos que participou</span>
							<div className="mt-00">{naver.project}</div>
						</div>
					</div>
					<div className="actions">
						<div className="bt-icon" onClick={e => handleOpenModalConfirmDelete(naver.id)}>
							<IconRemove/>
						</div>
						<div className='bt-icon' onClick={e => handleOpenEditNaver(naver.id)}>
							<IconEdit/>
						</div>
					</div>
					</section>
					<div className="fechar" onClick={handleCloseModalNaver}>
						<div className="bt-icon">
							<IconClose/>
						</div>
					</div>
				</div>
			</Modal>
			{/* MODAL CONFIRM DELETE */}
			<Modal 
				isOpen={modalConfirmDelete && naver.id === currentNaver} 
				onRequestClose={handleCloseModalConfirmDelete}
				style={modalConfirmDeleteCustomStyles} 
				ariaHideApp={false}
				>
				<div className="modal-delete">
					<div className="body">
						<h1>Excluir Naver</h1>
						<span>Tem certeza que deseja excluir <b>{naver.name}</b>?</span>
						<div className='actions mt-20'>
						<div className="bt bt-secondary" onClick={handleCloseModalConfirmDelete}>Cancelar</div>
						<div className="bt bt-primary" onClick={e => deleteNaver(naver.id)}>Excluir</div>
						</div>
					</div>
				</div>
			</Modal>
			{/* MODAL DELETE SUCCESS */}
			<Modal 
          isOpen={modalDeleteSucess} 
          onRequestClose={handleCloseModalDelSuccess}
          style={modalConfirmDeleteSuccessCustomStyles} 
          ariaHideApp={false}
          >
          <div className="modal-success">
					<div className="fechar" onClick={handleCloseModalDelSuccess}>
						<div className="bt-icon">
							<IconClose/>
						</div>
					</div>
            <div className="body">
              <h1>Naver excluído AAAA</h1>
							<div className='mt-20'>Naver excluído com sucesso!</div>
            </div>
				  </div>
        </Modal>
			</div>
			)
	}

	const NoNavers = () => {
		return (
			<div>
				<h3 className='mt-40'>Nenhum Naver cadastrado...</h3>
				<span className='mt-10'>Clique em "Adicionar Naver" para cadastrar o primeiro!</span>
			</div>
		)
	}

    return(
      (!loading && navers.length <= 0) ? <NoNavers/> :
			(!loading) ? <NaversSuccess/> : <div>Buscando Navers... </div>
    )
  }

const NaverList = () =>   {
  return (
    <section className="naver-list mt-10">
      <CardsNavers/>
    </section>
  )
}


export default NaverList
