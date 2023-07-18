import { BaseEntity } from 'src/core/entities/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BluetoothEntity } from './bluetooth.entity';
import { ChargingPortEntity } from './charging-port.entity';
import { MobileNetworkEntity } from './mobile-network.entity';
import { NetworkConnectionEntity } from './network-connection.entity';
import { OtherConnectEntity } from './other-connect.entity';
import { SIMEntity } from './sim.entity';
import { WifiEntity } from './wifi.entity';
import { GPSEntity } from './gps.entity';
import { MobileSystemEntity } from './mobile-system.entity';

@Entity('Connect')
export class ConnectEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  bluetoothId: string;

  @Column({ type: 'uuid', nullable: true })
  mobileNetworkId: string;

  @Column({ type: 'uuid', nullable: true })
  chargingPortId: string;

  @Column({ type: 'uuid', nullable: true })
  networkConnectionId: string;

  @Column({ type: 'uuid', nullable: true })
  simId: string;

  @Column({ type: 'uuid', nullable: true })
  wifiId: string;

  @Column({ type: 'uuid', nullable: true })
  gpsId: string;

  @Column({ type: 'uuid', nullable: true })
  otherConnectId: string;

  @ManyToOne(() => BluetoothEntity)
  @JoinColumn({ name: 'bluetoothId' })
  bluetooth: BluetoothEntity;

  @ManyToOne(() => MobileNetworkEntity)
  @JoinColumn({ name: 'mobileNetworkId' })
  mobileNetwork: MobileNetworkEntity;

  @ManyToOne(() => ChargingPortEntity)
  @JoinColumn({ name: 'chargingPortId' })
  chargingPort: ChargingPortEntity;

  @ManyToOne(() => NetworkConnectionEntity)
  @JoinColumn({ name: 'networkConnectionId' })
  networkConnection: NetworkConnectionEntity;

  @ManyToOne(() => SIMEntity)
  @JoinColumn({ name: 'simId' })
  sim: SIMEntity;

  @ManyToOne(() => WifiEntity)
  @JoinColumn({ name: 'wifiId' })
  wifi: WifiEntity;

  @ManyToOne(() => GPSEntity)
  @JoinColumn({ name: 'gpsId' })
  gps: GPSEntity;

  @ManyToOne(() => OtherConnectEntity)
  @JoinColumn({ name: 'otherConnectId' })
  otherConnect: OtherConnectEntity;

  @OneToMany(() => MobileSystemEntity, (mobileSystem) => mobileSystem.connect)
  mobileSystems: MobileSystemEntity[];
}
