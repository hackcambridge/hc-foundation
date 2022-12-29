import React, { useEffect, useRef } from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import './MailingListForm.scss';

type CustomFormProps = {status?: string | null, message?: string | Error | null, onValidated: (email: string)=>void};
const CustomForm = ({status, message, onValidated} : CustomFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit: React.FormEventHandler<Element> = (e) => {
        e.preventDefault();
        if (inputRef.current) {
            console.log(inputRef.current.value);
            const email = inputRef.current.value;
            email.indexOf("@") > -1 &&
            onValidated(email);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, [status]);
    return <form className="MailingListForm" onSubmit={handleSubmit}>
                <input type="email" name="email" id="mailing-list-email" ref={inputRef}/>
                <input type="submit" name="submit" id="mailing-list-submit" value="Join"/>
                {status === 'success' && <div>Success!</div>}
                {status === 'error' && <div style={{color: 'red'}}>Error</div>}
            </form>;
}

export type MailingListFormProps = {};

export default function MailingListForm(props: MailingListFormProps) {
    const url = `https://${process.env.REACT_APP_MAILCHIMP_PREFIX}.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`
    return <MailchimpSubscribe url={url} render={({subscribe, status, message}) => {
        return <CustomForm status={status} message={message} onValidated={(email) => {
            subscribe({EMAIL: email});
        }}/>
    }}/>
}
