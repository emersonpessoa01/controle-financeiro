import React, { useEffect, useState } from "react";
import * as api from "./api/apiService";
import Navigate from "./components/Navigate";
import Resume from "./components/Resume";
import Details from "./components/Details";
import Filter from "./components/Filter";
import Spinner from "./components/Spinner";
import ModalForm from "./components/ModalForm";
import New from "./components/New";
import ModalConfirmDelete from "./components/ModalConfirmDelete";

export default function App() {
  const date = new Date();

  const yearMonthCurrent = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}`;

  const [period, setPeriod] = useState(yearMonthCurrent);
  const [yearMonthFiltered, setYearMonthFiltered] = useState([]);
  const [yearMonthSelected, setYearMonthSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    setYearMonthFiltered([]);
    const getYearMonth = async () => {
      const data = await api.getAll(period);
      setYearMonthFiltered(data);
      setYearMonthSelected(data);
      console.log(data);
    };

    if (period != null) getYearMonth();
  }, [period]);

  const handleYearMonth = (selected) => {
    setPeriod(selected);
  };

  const handleFilter = (filtered) => {
    setYearMonthFiltered(filtered);
  };

  const handlePersist = (selected) => {
    setLaunch(selected);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePersistData = async (launchPersist, isEdit) => {
    try {
      if (!isEdit) {
        await api.insert(launchPersist);
      } else {
        await api.update(launchPersist);
      }

      handleCloseModal();
      refresh();
    } catch {
      console.log("Falha ao gravar");
    }
  };

  const refresh = (period) => {
    // const p = period;
    setPeriod(null);
    setPeriod(period);
  };

  const handleSelectedDelete = (launchDelete) => {
    setLaunch(launchDelete);

    setIsModalDeleteOpen(true);
  };

  const handleSelectedEdit = (launchEdit) => {
    setLaunch(launchEdit);
    setIsModalOpen(true);
  };

  const handlePersistDelete = async (deleted) => {
    setIsModalDeleteOpen(false);

    if (deleted) {
      try {
        await api.remove(launch._id);
        refresh();
      } catch {
        console.log("Erro ao deletar");
      }
    }
  };

  const { centeredTitle, row } = styles;
  return (
    <div>
      <div className="container">
        <div style={centeredTitle}>Desafio Final - Bootcamp Full Stack</div>

        <Navigate 
        defaultPeriod={period} 
        onChangeYearMonth={handleYearMonth} />

        {yearMonthFiltered.length !== 0 && (
          <Resume yearMonths={yearMonthFiltered} />
        )}

        {yearMonthFiltered.length === 0 && <Spinner />}
      </div>

      {yearMonthFiltered.length !== 0 && (
        <div className="container" style={{ paddingTop: "10px" }}>
          <div style={row}>
            <New onPersist={handlePersist} />
            <Filter 
            yearMonths={yearMonthSelected} 
            onFilter={handleFilter} />
          </div>
        </div>
      )}

      {yearMonthFiltered.length !== 0 && (
        <Details
          yearMonths={yearMonthFiltered}
          onEdit={handleSelectedEdit}
          onDelete={handleSelectedDelete}
        />
      )}

      {isModalOpen && (
        <ModalForm
          onCloseModal={handleCloseModal}
          onSave={handlePersistData}
          onLaunch={launch}
        />
      )}

      {isModalDeleteOpen && (
        <ModalConfirmDelete 
        onDelete={handlePersistDelete} />
      )}
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.4em",
    paddingTop: "20px",
    color: "#171395",
    fontFamily: "Righteous",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "5px",
    paddingBottom: "8px",
  },
};
