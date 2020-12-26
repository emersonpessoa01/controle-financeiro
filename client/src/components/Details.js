import React from "react";

export default function Details({ yearMonths, onDelete, onEdit }) {
  const handleEdit = (item) => {
    onEdit(item);
  };

  const handleDelete = (item) => {
    onDelete(item);
  };

  return (
    <div className="container">
      {yearMonths.map((item) => {
        return (
          <div
            key={`div_${item._id}`}
            className="row"
            style={{
              backgroundColor: item.type === "-" ? "#9897FF " : "#0094FF",
              border: "1px solid gray",
              borderRadius: "5px",
              display: "flex",
            }}
          >
            <div
              className="col s1.5"
              style={{ fontSize: "1.2em", fontWeight: "bold", padding: "15px", }}
            >
              {item.day.toString().padStart(2, "0")}/
              {item.month.toString().padStart(2, "0")}
            </div>

            <div className="col s8">
              <div style={{ fontWeight: "bold", fontSize: "1.1em", paddingTop:"7px"}}>
                Categoria: {item.category}
              </div>

              <div style={{ fontSize: "0.8em" }}>
                Descrição: {item.description}
              </div>
            </div>
            
            <div
              className="col s2 valign-wrapper"
              style={{ fontSize: "1.6em"}}
            >
              R${" "}
              {item.value.toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </div>
            
            <div
              className="col s1 right-align valign-wrapper"
              style={{
                display: "flex",
                textAlign: "right",
                flexDirection: "column",
              }}
            >
              <div
                className="waves-effect waves-teal btn-flat"
                onClick={() => handleEdit(item)}
                alt={item.description}
                style={{cursor:"pointer"}}
              >
                <i style={{ color: "#fff" }} className="tiny material-icons">
                  edit
                </i>
              </div>
              
              <div
                className="waves-effect waves-teal btn-flat"
                onClick={() => handleDelete(item)}
                alt={item.description}
                style={{cursor:"pointer"}}
              >
                <i style={{ color: "#DD0031" }} className="tiny material-icons">
                  delete
                </i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
