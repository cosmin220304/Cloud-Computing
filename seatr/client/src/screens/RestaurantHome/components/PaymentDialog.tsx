import { DialogProps, Typography } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import React from "react";
import MenuItem from "../../../models/MenuItem";
import GooglePayButton from "@google-pay/button-react";

interface ItemQuantity {
  item: MenuItem;
  quantity: number;
}
interface PaymentDialogProps {
  dialogProps: DialogProps;
  order: Array<ItemQuantity>;
  finishMakeReservation: Function
}
const PaymentDialog = (props: PaymentDialogProps) => {
  const calculateTotal = (order: Array<ItemQuantity>) => {
    let total = 0;
    order.forEach(({ item, quantity }) => {
      total += item.price * quantity;
    });
    return total;
  };
  return (
    <Dialog {...props.dialogProps}>
      <DialogTitle> <div className="center-text"> Pay for your order </div> </DialogTitle>
      <div className="center-children p-2 gap-1">
        <Typography>{`You have to pay ${calculateTotal(props.order)} RON`}</Typography>
        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: `${calculateTotal(props.order)}`,
              currencyCode: "RON",
              countryCode: "RO",
            },
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
            props.finishMakeReservation();
          }}
        />
      </div>
    </Dialog>
  );
};
export default PaymentDialog;
