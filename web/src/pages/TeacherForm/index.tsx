import React, { useState, FormEvent } from 'react';
import './styles.css';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function TeacherForm() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const history = useHistory();

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        api.post('classes', {
            name,
            avatar,
            bio,
            whatsapp,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }).then(() => alert('Cadastro realizado com sucesso!'))
            .then(() => history.push('/'))
            .catch(() => alert('Falha ao realizar cadastro.'));
    };

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            };
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    };

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    };

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>
                            Seus dados
                    </legend>
                        <Input name="name" value={name} onChange={e => setName(e.target.value)} label="Nome completo" />
                        <Input name="avatar" value={avatar} onChange={e => setAvatar(e.target.value)} label="Avatar" />
                        <Input label="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} name="Whatsapp" />
                        <TextArea label="Biografia" value={bio} onChange={e => setBio(e.target.value)} name="bio" />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Sobre a aula
                    </legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                            ]}
                        />
                        <Input name="cost" value={cost} onChange={e => setCost(e.target.value)} label="Custo da sua hora por aula" />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {
                            scheduleItems.map((scheduleItem, index) => (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input name="from" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)} label="Das" type="time" />
                                    <Input name="to" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)} label="Até" type="time" />
                                </div>
                            ))
                        }
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">Salvar todos os dados</button>
                    </footer>
                </form>
            </main>
        </div>
    );
};

export default TeacherForm;