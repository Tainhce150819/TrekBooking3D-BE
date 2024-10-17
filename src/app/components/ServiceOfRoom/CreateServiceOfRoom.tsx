"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";
import serviceOfRoom from "@/app/services/serviceOfRoom";
import useSWR from "swr";

interface Iprops {
  showServiceOfRoomCreate: boolean;
  setShowServiceOfRoomCreate: (value: boolean) => void;
  onCreate: () => void;
  thisRoomId: number;
}

interface IService {
  serviceId: number;
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
}

function CreateServiceOfRoom(props: Iprops) {
  const { showServiceOfRoomCreate, setShowServiceOfRoomCreate, onCreate, thisRoomId } = props;
  const [serviceId, setServiceId] = useState<number>(0);

  const {
    data: listService,
    error,
    mutate: mutateListService,
  } = useSWR("listService", () => serviceOfRoom.getServices());

  const handleSubmit = async () => {
    try {
      const roomService = {
        roomId: thisRoomId,
        serviceId,
      };
      const response = await serviceOfRoom.createRoomService(roomService);
      toast.success("Add Service Success");
      handleCloseModal();
      onCreate();
    } catch (error) {
      toast.error("Service have exists!");
      console.error("Error adding service:", error);
    }
  };

  const handleCloseModal = () => {
    setServiceId(0);
    setShowServiceOfRoomCreate(false);
  };

  return (
    <>
      <Modal
        className="pt-36"
        show={showServiceOfRoomCreate}
        onHide={() => handleCloseModal()}
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Service for Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formService">
              <Form.Label>Service</Form.Label>
              <Form.Control
                as="select"
                value={serviceId}
                onChange={(e: any) => setServiceId(Number(e.target.value))}
              >
                <option value={0}>Please select a service</option>
                {listService && listService.map((service: IService) => (
                  <option key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border"
            style={{
              background: "white",
              color: "black",
              borderRadius: "10px",
            }}
            onClick={() => handleCloseModal()}
          >
            Close
          </Button>
          <Button
            style={{ background: "#305A61" }}
            onClick={() => handleSubmit()}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateServiceOfRoom;
