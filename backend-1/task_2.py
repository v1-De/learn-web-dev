class Appointment:
    def __init__(self, client_name: str, master_id: int, service_id: int, time: str):        
        self.id = len(appointments) + 1
        self.client_name = client_name
        self.master_id = master_id
        self.service_id = service_id
        self.time = time

def create_appointment (client_name: str, master_id: int, service_id: int, time: str) -> Appointment | None:
    if ((client_name == '' or client_name == None)
    or (master_id == 0 or master_id == None)
    or (service_id == 0 or service_id == None)
    or (time == '' or time == None)):
        return None;

    hours = int(time[:2])
    minutes = int(time[-2:])

    if ((hours < 8 or hours > 20)):
        return None
    elif (hours == 20 and minutes > 0):
        return None
    
    newAppointment = Appointment(client_name, master_id, service_id, time)

    if newAppointment == None:
        return None

    appointments.append(newAppointment)
    return newAppointment
appointments = []

first_appointment = create_appointment("Иванова А.А.", 1, 1, '10:00')
second_appointment = create_appointment("Петрова А.А.", 1, 1, '11:00')
print("Список записей:")
for appointment in appointments:
    print(appointment.client_name, appointment.time)

appointments = []
no_correct_appointment = create_appointment("Петрова А.А.", 1, 1, '00:00')
print(len(appointments))