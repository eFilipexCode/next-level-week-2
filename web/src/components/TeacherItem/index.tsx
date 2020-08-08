import React from 'react';
import './styles.css';
import zap from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
    name: string;
    bio: string;
    cost: number;
    id: number;
    avatar: string;
    subject: string;
    whatsapp: string;
};

interface TeacherItemProps {
    teacher: Teacher;
};

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function createNewConnection() {
        api.post('connections', { user_id: teacher.id });
    };

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" onClick={createNewConnection} href={`https://wa.me/+55${teacher.whatsapp}`} type="button">
                    <img src={zap} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;