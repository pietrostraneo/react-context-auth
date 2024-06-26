import jumbotronStyle from './Jumbotron.module.scss'

export default function Jumbotron() {
    return (
        <>
            <div className="container">
                <div className="row mt-5 justify-content-center">

                    <div className={`col-12 col-md-8 ${jumbotronStyle.jumbo}`}>
                        <img src="https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="placeholder" className="img-fluid" />
                        <div className={jumbotronStyle.overlay}>
                            <h1 className="text-white">Welcome to <span className="text-success">Innov8Tech</span></h1>
                            <button className="btn btn-success p-1 mt-1">Read more</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}