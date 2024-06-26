import loaderStyle from './Loader.module.scss'

export default function Loader() {
    return (
        <>
            <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className={loaderStyle.wheel_and_hamster}>
                <div className={loaderStyle.wheel}></div>
                <div className={loaderStyle.hamster}>
                    <div className={loaderStyle.hamster__body}>
                        <div className={loaderStyle.hamster__head}>
                            <div className={loaderStyle.hamster__ear}></div>
                            <div className={loaderStyle.hamster__eye}></div>
                            <div className={loaderStyle.hamster__nose}></div>
                        </div>
                        <div className={`${loaderStyle.hamster__limb} ${loaderStyle.hamster__limb__fr}`}></div>
                        <div className={`${loaderStyle.hamster__limb} ${loaderStyle.hamster__limb__fl}`}></div>
                        <div className={`${loaderStyle.hamster__limb} ${loaderStyle.hamster__limb__br}`}></div>
                        <div className={`${loaderStyle.hamster__limb} ${loaderStyle.hamster__limb__bl}`}></div>
                        <div className={loaderStyle.hamster__tail}></div>
                    </div>
                </div>
                <div className={loaderStyle.spoke}></div>
            </div>
        </>
    )
}