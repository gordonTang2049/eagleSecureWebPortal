import React from 'react'
import RegistersTagsCombineTable from '../components/tables/registerTagsTable/registerTagsCombineTable';


interface registerTagsPageProps {

}

export const RegisterTagsPage: React.FC<registerTagsPageProps> = () => {
         return (
             <>
                <h1>This is Register Tags Page</h1>
                <RegistersTagsCombineTable />
             </>
         );
}
  