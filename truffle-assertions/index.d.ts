// Type definitions for truffle-assertions
// Project: https://github.com/rkalis/truffle-assertions
// Definitions by: Joe Agster <https://github.com/joeax>

/**
 * This package adds additional assertions that can be used to test Ethereum smart contracts inside Truffle tests.
 * {@link https://github.com/rkalis/truffle-assertions}
 * @module truffle-assertions
 * @requires truffle
 * @requires web3
 */
 declare module "truffle-assertions" {

  /**
   * Defines various error types thrown by contract execution.
   * @enum {string}
   */
  export enum ErrorType {
    REVERT = 'revert',
    INVALID_OPCODE = 'invalid opcode',
    OUT_OF_GAS =  'out of gas',
    INVALID_JUMP = 'invalid JUMP',
  }

  /**
   * Transaction result error.
   * @extends Error 
   */
  export class InvalidTxResultError extends Error {}
  
  /**
   * Checks that an event with type `eventType` has been emitted by the transaction with result `result`.
   * @param result 
   * @param eventType 
   * @param filterOrObject Filter function or object to further specify requirements for the event arguments
   * @param message Custom message, to be displayed alongside the default one
   */
  export function eventEmitted(
    result: any,
    eventType: string,
    filterOrObject: (obj: object) => boolean | object,
    message?: string
  ): void;

   /**
   * Checks that an event with type `eventType` has not been emitted by the transaction with result `result`.
   * @param result 
   * @param eventType 
   * @param filterOrObject Filter function or object to further specify requirements for the event arguments
   * @param message Custom message, to be displayed alongside the default one
   */
  export function eventNotEmitted(
    result: any,
    eventType: string,
    filterOrObject: (obj: object) => boolean | object,
    message?: string
  ): void;

  /**
   * Pretty prints the full list of events with their parameters, that were emitted in transaction with result `result`.
   * @param result 
   * @param indentationSize Number of spaces to indent
   */
  export function prettyPrintEmittedEvents(
    result: any,
    indentationSize: number
  ): void;

  /**
   * Create a transaction result object from a contract instance and a transaction hash, which can then be used in the other functions that the library offers.
   * @param contract Contract instance
   * @param transactionHash Transaction hash
   */
  export function createTransactionResult(
    contract: any,
    transactionHash: string
  ): Promise<any>;

  /**
   * Asserts that the passed async contract function does not fail.
   * @param asyncFn The promise result from a contract async call
   * @param message Custom message, to be displayed alongside the default one
   * @returns An empty promise
   */
  export function passes<TResponse>(asyncFn: Promise<TResponse>, message?: string): Promise<void>;

  /**
   * Asserts that the passed async contract function fails with a certain ErrorType and reason.
   * @param asyncFn The promise result from a contract async call
   * @param errorType The specific error type to check for
   * @param reason An extra filter on the revert reason (note that this is only relevant in the case of revert, not for the other ErrorTypes). This functionality requires at least Truffle v0.5.
   * @param message Custom message, to be displayed alongside the default one
   * @returns An empty promise
   */
  export function fails<TResponse>(
    asyncFn: Promise<TResponse>,
    errorType?: ErrorType,
    reason?: string,
    message?: string
  ): Promise<void>;

  /**
   * Asserts that the passed async contract function reverts with a certain ErrorType and reason.
   * This is an alias for truffleAssert.fails().
   * @param asyncFn The promise result from a contract async call
   * @param reason An extra filter on the revert reason (note that this is only relevant in the case of revert, not for the other ErrorTypes). This functionality requires at least Truffle v0.5.
   * @param message Custom message, to be displayed alongside the default one
   * @returns An empty promise
   */
  export function reverts<TResponse>(
    asyncFn: Promise<TResponse>,
    reason?: string,
    message?: string
  ): Promise<void>;
}
