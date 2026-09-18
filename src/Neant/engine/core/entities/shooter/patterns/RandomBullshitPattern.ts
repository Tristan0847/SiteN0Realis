import {
    AbstractRegularPattern,
    RegularPatternProps
} from "@/engine/core/entities/shooter/patterns/AbstractRegularPattern";
import {LineShootPattern, LineShootPatternOptions} from "@/engine/core/entities/shooter/patterns/LineShootPattern";
import {Enemy} from "@/engine/core/entities/shooter/Enemy";
import {ProjectilePool} from "@/engine/core/entities/shooter/ProjectilePool";
import {StraightShootPattern} from "@/engine/core/entities/shooter/patterns/StraightShootPattern";
import {TripleShootPattern} from "@/engine/core/entities/shooter/patterns/TripleShootPattern";

/**
 * Class that throws a random patern at each call
 */
export class RandomBullshitPattern extends AbstractRegularPattern {

    private paterns : AbstractRegularPattern[];

    constructor(props : RegularPatternProps, lineShootprops : LineShootPatternOptions) {
        super(props);
        this.paterns = [
            new LineShootPattern(lineShootprops),
            new StraightShootPattern(props),
            new TripleShootPattern(props),
        ];
    }

    public shoot(enemy: Enemy, pools: Readonly<Record<string, ProjectilePool>>): boolean {

        const randomPatern = this.paterns[Math.floor(Math.random() * this.paterns.length)];

        return randomPatern.shoot(enemy, pools);
    }
}