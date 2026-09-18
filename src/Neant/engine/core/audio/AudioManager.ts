import Phaser from "phaser";
import {AudioBus} from "@/engine/core/audio/AudioBusEnum";
import {gameSettingsStore} from "@/engine/core/settings/GameSettingsStore";

type PlayableSound = Phaser.Sound.BaseSound & { setVolume(value: number): unknown };
/**
 * Class managing the audio files and the audio buses
 */
export class AudioManager {
    private readonly sound: Phaser.Sound.BaseSoundManager;
    private readonly soundsByBus: Map<AudioBus, Set<Phaser.Sound.BaseSound>>;
    private readonly trackedSounds: Map<string, Phaser.Sound.BaseSound> = new Map();

    public constructor(sound: Phaser.Sound.BaseSoundManager) {
        this.sound = sound;

        this.soundsByBus = new Map([
            [AudioBus.MUSIC, new Set()],
            [AudioBus.VOICE, new Set()],
            [AudioBus.EFFECTS, new Set()],
            [AudioBus.VOID, new Set()]
        ]);

        // Registers a callback to update the volume of all sounds when the bus volume changes
        gameSettingsStore.setOnBusVolumeChange((bus, volume) => {
            this.soundsByBus.get(bus)?.forEach(sound => (sound as PlayableSound).setVolume(volume));
        });
    }

    public getBusVolume(bus: AudioBus): number {
        return gameSettingsStore.getBusVolume(bus);
    }

    public createSound(
        key: string,
        bus: AudioBus,
        config?: Phaser.Types.Sound.SoundConfig,
        id?: string,
    ): Phaser.Sound.BaseSound {
        const sound = this.sound.add(key, config);
        (sound as PlayableSound).setVolume(this.getBusVolume(bus));

        const set = this.soundsByBus.get(bus);
        if (set) {
            set.add(sound);
            // Once the sound is complete, remove it from the set
            sound.once(Phaser.Sound.Events.COMPLETE, () => {
                set.delete(sound);
            });
            // Once the sound is deleted, deletes it from the set
            sound.once(Phaser.Sound.Events.DESTROY, () => {
                set.delete(sound);
                if (id && this.trackedSounds.get(id) === sound) {
                    this.trackedSounds.delete(id);
                }
            });
        }

        if (id) {
            // If the id already exists, stop the previous sound
            this.stopTracked(id);
            this.trackedSounds.set(id, sound);
        }

        return sound;
    }

    public stopTracked(id: string): void {
        const sound = this.trackedSounds.get(id);
        if (!sound) return;

        sound.stop();
        sound.destroy();
    }
}