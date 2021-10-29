import Form from "./form";

class CommonCart extends Form {
    getTotalPrice = ()=>{
        const price = this.state.totalPrice;
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export default CommonCart;