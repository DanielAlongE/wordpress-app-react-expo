import React from 'react';
import FormBuilder from './containers/FormBuilderContainer';

const formData = [
    {title:{value:"Application form"}},
    {section:{title:'First Section', data:[
            {textarea:{name:'story', label:'Tell your story', numberOfLines:5}},
        ]}
    },
    {section:{title:'Second Section', data:[
        {switch:{name:'on', label:'Turned on'}},
    ]}
},
]

export const TestForm = () => <FormBuilder data={formData} />