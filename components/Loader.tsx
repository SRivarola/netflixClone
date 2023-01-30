import { Oval } from 'react-loader-spinner'

function Loader() {
    return (
      <div className='flex items-center justify-center'>
        <Oval
          height={28}
          width={28}
          color="#d1d5db"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#e50914"
          strokeWidth={2}
          strokeWidthSecondary={2}
  
        />
      </div>
    )
  }
  
  export default Loader